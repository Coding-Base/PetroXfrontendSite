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
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function DashboardNav({ items, setOpen, isMobileNav = false }) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  console.log('isActive', isMobileNav, isMinimized);
  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          // Use a safe fallback if the icon key is missing
          const Icon = Icons[item.icon] || Icons['arrowRight'];
          if (!item.href) return null;
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  to={item.disabled ? '/' : item.href}
                  className={cn(
                    'hover:text-muted-foreground flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium',
                    path === item.href ? 'bg-blue-700 text-black hover:text-black' : 'transparent',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                >
                  {typeof Icon === 'function' ? (
                    <Icon className={`ml-2.5 size-5 text-white`} />
                  ) : (
                    <span className="ml-2.5 size-5 text-white">•</span>
                  )}

                  {isMobileNav || (!isMinimized && !isMobileNav) ? (
                    <span className="mr-2 truncate text-white">{item.title}</span>
                  ) : (
                    ''
                  )}
                </Link>
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
  );
}
