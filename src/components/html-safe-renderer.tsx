'use client';

import DOMPurify from 'isomorphic-dompurify';

export default function HtmlSafeRenderer({ html }: { html: string; }) {
  const sanitizedHTML = DOMPurify.sanitize(html);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
  );
}