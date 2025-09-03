import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

type Role = "Admin" | "Docente" | "Estudiante";

export const useDetectedRole = () => {
  const [role, setRole] = useState<Role>('Admin');
  
  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@gmail.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      role: "Docente",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@gmail.com", // Fixed: removed space
      avatar: "https://i.pravatar.cc/150?img=3",
      role: "Estudiante",
    },
  ];
  
  useEffect(() => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    setRole(randomUser.role as Role);
  }, []); // Fixed: empty dependency array
  
  // Return user for role
  const usuario = users.find(user => user.role === role);
  
  return {
    usuario,
    role,
    setRole // Added in case you want to manually change role
  };
};