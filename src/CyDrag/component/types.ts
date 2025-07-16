// TypeScript类型定义
// @ts-ignore

export type Id = string;

export type Author = {
  id: string;
  name: string;
  avatar: string;
};

export type Quote = {
  id: Id;
  content: string;
  author: Author;
};

export type QuoteMap = {
  [key: string]: Quote[];
};
