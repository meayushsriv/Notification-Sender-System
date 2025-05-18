import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export default function ViewNotifications() {
  const { userId } = useParams();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/notifications`
        );
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [userId]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Notifications for User: {userId}
      </Typography>

      <List>
        {notifications.map((notification, index) => (
          <div key={notification._id}>
            <ListItem>
              <ListItemText
                primary={notification.title}
                secondary={
                  <>
                    <Typography component="span" display="block">
                      Type: {notification.type}
                    </Typography>
                    <Typography component="span" display="block">
                      Status: {notification.status}
                    </Typography>
                    <Typography component="span" display="block">
                      {notification.message}
                    </Typography>
                    <Typography
                      component="span"
                      display="block"
                      color="text.secondary"
                    >
                      {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < notifications.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Box>
  );
}
