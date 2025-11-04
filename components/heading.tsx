import React from 'react'
import { Badge } from './ui/badge';
import { caveat } from '@/fonts/fonts';

interface HeadingProps {
  title: string;
  discription: string[];
}
const Heading = ({title, discription}: HeadingProps) => {
  return (
    <div className="mb-20 animate-fade-in">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-px bg-indigo-600 animate-expand"></div>
        <Badge
          variant="outline"
          className="text-sm font-semibold text-indigo-600 tracking-wider uppercase border-indigo-200 bg-transparent"
        >
          {title}
        </Badge>
      </div>
      <h2 className={`text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight ${caveat.className}`}>
        {discription.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </h2>
    </div>
  );
}

export default Heading