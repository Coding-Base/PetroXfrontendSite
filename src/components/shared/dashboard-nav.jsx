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
          if (!item.href) return null;
          
          // Get the icon component from the Icons object
          const Icon = Icons[item.icon];
          
          // Debug: log icon resolution for troubleshooting
          if (!Icon) {
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
                  {Icon ? (
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
