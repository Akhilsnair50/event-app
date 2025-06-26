import DOMPurify from 'dompurify'

export default function EventAbout({ description }: { description: string }) {
  // Remove inline styles and sanitize the HTML
  const cleanHtml = DOMPurify.sanitize(description, {
    FORBID_ATTR: ['style'], // <--- Key part
  });

  return (
    <section className="event-about">
      <h3>About</h3>
      <div
        className="event-description"
        style={{ color: 'white' }}
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </section>
  );
}
