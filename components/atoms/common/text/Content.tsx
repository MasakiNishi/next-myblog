const Content = ({ content }: { content: string }) => {
  return (
    <div
      id="content"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning={true}
    ></div>
  );
};

export default Content;
