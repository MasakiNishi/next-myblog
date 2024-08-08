import { notFound } from "next/navigation";
// type
import PageType from "../../types/PageType";
// service
import PageService from "../../services/PageService";
// component
import PageTitle from "../../components/atoms/common/text/Title";
import PageFeatureImage from "../../components/atoms/common/image/FeatureImage";

interface PostPageProps {
  params: {
    page: string;
  };
}

const Page = async ({ params }: PostPageProps) => {
  const page: PageType | null = await PageService.getOne({ id: params.page });

  if (!page) {
    notFound();
    return null; // 実際には返されないが、TypeScriptの型エラーを防ぐため
  }

  return (
    <article className="w-main mx-auto max-w-[50em] p-4 sm:p-14">
      <div className="mt-4 sm:mt-0 mb-7">
        <PageTitle>{page.title}</PageTitle>
      </div>
      {page.featuredImage && (
        <PageFeatureImage
          featuredImage={page.featuredImage}
          className="mb-7 -mx-4 sm:-mx-14 flex justify-center"
        />
      )}
      <div
        id="content"
        dangerouslySetInnerHTML={{ __html: page.content }}
        suppressHydrationWarning={true}
      ></div>
    </article>
  );
};

export default Page;
