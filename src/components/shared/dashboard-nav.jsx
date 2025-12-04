import { Icons } from '../ui/icons';
import { cn } from '../../lib/utils';
import { useSidebar } from '../../hooks/use-sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip';
import { usePathname } from '../../routes/hooks';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ActivationModal from './ActivationModal';
import { useFeatureActivation } from '@/hooks/useFeatureActivation';

export default function DashboardNav({ items, setOpen, isMobileNav = false }) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const { isUnlocked, monetizationInfo, verifyCode, loading } = useFeatureActivation();
  const [showModal, setShowModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [pendingHref, setPendingHref] = useState(null);

  if (!items?.length) {
    return null;
  }

  return (
    <>
      <nav className="grid items-start gap-2">
        <TooltipProvider>
          {items.map((item, index) => {
            if (!item.href) return null;

            // Get the icon component from the Icons object
            const Icon = Icons[item.icon];

            // Debug: log icon resolution for troubleshooting
            if (!Icon) {
              // eslint-disable-next-line no-console
              console.warn(`Icon "${item.icon}" not found or invalid for "${item.title}"`);
            }

            // Determine if this tab should be protected.
            // Exclude certain safe paths (enrolled courses, dashboard and login/logout) from protection.
            const safeExclusions = ['/dashboard', '/login', '/dashboard/enrolled-courses'];
            const protectedTab = !safeExclusions.some(p => item.href.startsWith(p));
            // While loading monetization info, block protected tabs to avoid early navigation
            const shouldBlock = protectedTab && (loading ? true : (monetizationInfo?.is_enabled && !isUnlocked));

            const handleClick = (e) => {
              // If monetization is enabled and feature locked, show modal
              if (shouldBlock) {
                e.preventDefault();
                setPendingHref(item.href);
                setShowModal(true);
                return false;
              }

              if (setOpen) setOpen(false);
            };

            const commonClassName = cn(
              'hover:text-muted-foreground flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium transition-all',
              path === item.href ? 'bg-blue-700 text-black hover:text-black' : 'transparent',
              item.disabled && 'cursor-not-allowed opacity-80',
              shouldBlock && 'cursor-not-allowed opacity-50 bg-gray-600'
            );

            const tabContent = (
              <>
                {Icon ? (
                  <Icon className={`ml-2.5 h-5 w-5 text-white`} />
                ) : (
                  <span className="ml-2.5 h-5 w-5 text-white flex items-center justify-center">?</span>
                )}

                {isMobileNav || (!isMinimized && !isMobileNav) ? (
                  <span className="mr-2 truncate text-white flex items-center">
                    <span>{item.title}</span>
                    {shouldBlock && (
                      // lock icon for protected tab
                      <span className="ml-2 inline-flex items-center">
                        {Icons.lock ? <Icons.lock className="h-4 w-4 text-yellow-200" /> : null}
                      </span>
                    )}
                  </span>
                ) : (
                  ''
                )}
              </>
            );

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  {shouldBlock ? (
                    <button
                      type="button"
                      onClick={handleClick}
                      className={commonClassName}
                    >
                      {tabContent}
                    </button>
                  ) : (
                    <Link
                      to={item.disabled ? '/' : item.href}
                      className={commonClassName}
                      onClick={handleClick}
                    >
                      {tabContent}
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
      {/* Activation modal used when monetization is active and user tries protected feature */}
      <ActivationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        monetizationInfo={monetizationInfo}
        onCodeSubmit={async (code) => {
          setIsVerifying(true);
          try {
            const res = await verifyCode(code);
            if (res.success && pendingHref) {
              // navigate after successful activation
              window.location.href = pendingHref;
            }
            return res;
          } finally {
            setIsVerifying(false);
          }
        }}
        isVerifying={isVerifying}
      />
    </>
  );
}
