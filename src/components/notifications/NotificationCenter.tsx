
import { useState } from "react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, MessageSquare, Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'message' | 'interview' | 'application' | 'task';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'message',
      title: 'New message from HR',
      description: 'Please review the updated job description for Frontend Developer position',
      time: '10 minutes ago',
      isRead: false
    },
    {
      id: '2',
      type: 'interview',
      title: 'Interview scheduled',
      description: 'Technical interview with John Doe at 2:00 PM tomorrow',
      time: '1 hour ago',
      isRead: false
    },
    {
      id: '3',
      type: 'application',
      title: 'New application received',
      description: 'Sarah Williams applied for UX Designer position',
      time: '3 hours ago',
      isRead: true
    },
    {
      id: '4',
      type: 'task',
      title: 'Task reminder',
      description: 'Complete candidate evaluation for Michael Chen',
      time: 'Yesterday',
      isRead: false
    }
  ]);

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'interview':
        return <Calendar className="h-4 w-4" />;
      case 'application':
        return <User className="h-4 w-4" />;
      case 'task':
        return <Check className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message':
        return "bg-blue-100 text-blue-600";
      case 'interview':
        return "bg-purple-100 text-purple-600";
      case 'application':
        return "bg-amber-100 text-amber-600";
      case 'task':
        return "bg-green-100 text-green-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ats-600 p-0 text-[10px] text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-0">
            <ScrollArea className="h-[300px]">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "flex gap-3 p-3 cursor-pointer hover:bg-muted transition-colors border-b",
                      !notification.isRead && "bg-muted/50"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={cn("mt-0.5 flex h-9 w-9 items-center justify-center rounded-full", getNotificationColor(notification.type))}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-full w-full items-center justify-center p-8 text-center">
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="unread" className="space-y-0">
            <ScrollArea className="h-[300px]">
              {notifications.filter(n => !n.isRead).length > 0 ? (
                notifications.filter(n => !n.isRead).map((notification) => (
                  <div 
                    key={notification.id}
                    className="flex gap-3 p-3 cursor-pointer hover:bg-muted transition-colors border-b bg-muted/50"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={cn("mt-0.5 flex h-9 w-9 items-center justify-center rounded-full", getNotificationColor(notification.type))}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-full w-full items-center justify-center p-8 text-center">
                  <p className="text-sm text-muted-foreground">No unread notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="recent" className="space-y-0">
            <ScrollArea className="h-[300px]">
              {/* Display only notifications from the last 24 hours (in this mock we'll just show the first two) */}
              {notifications.slice(0, 2).length > 0 ? (
                notifications.slice(0, 2).map((notification) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "flex gap-3 p-3 cursor-pointer hover:bg-muted transition-colors border-b",
                      !notification.isRead && "bg-muted/50"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={cn("mt-0.5 flex h-9 w-9 items-center justify-center rounded-full", getNotificationColor(notification.type))}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-full w-full items-center justify-center p-8 text-center">
                  <p className="text-sm text-muted-foreground">No recent notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="border-t p-2">
          <Button variant="outline" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
