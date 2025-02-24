'use client';

import DOMPurify from 'dompurify';

export default function Description({ value }: { value: string }) {
  const sanitizedHTML = DOMPurify.sanitize(value.replaceAll('"', '').replaceAll('\\', ''));

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      className={`
        flex flex-col gap-2.5
        [&_h1]:text-4xl [&_h1]:font-bold
        [&_h2]:text-3xl [&_h2]:font-medium
        [&_ul]:list-disc [&_ul]:pl-6
        [&_ol]:list-decimal [&_ol]:pl-6
        [&_li]:my-2
      `}
    />
  );
}