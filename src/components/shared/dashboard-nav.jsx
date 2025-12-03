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

export default function DashboardNav({ items, setOpen, isMobileNav = false }) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          // Use a safe fallback if the icon key is missing
          const Icon = Icons[item.icon] || Icons['arrowRight'];
          if (!item.href) return null;
          
          // Debug: log icon resolution for troubleshooting
          const isValidIcon = Icon && typeof Icon === 'function';
          if (!isValidIcon) {
            // eslint-disable-next-line no-console
            console.warn(`Icon "${item.icon}" not found or invalid for "${item.title}"`);
          }
          
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
                  {isValidIcon ? (
                    <Icon className={`ml-2.5 h-5 w-5 text-white`} />
                  ) : (
                    <span className="ml-2.5 h-5 w-5 text-white flex items-center justify-center">?</span>
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
