// types.ts

export interface BlogPost {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    date: string;
    author: {
      name: string;
      avatar: string;
      initials: string;
    };
    category: string;
    image: string;
  }
  