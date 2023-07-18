import Link from "next/link";
import Head from "next/head";
import Layout, { siteTitle } from "../pages/components/layout";
import { getSortedPostsData } from "../lib/posts";
import Date from "../utils/date";
import { GetStaticProps } from "next";
import Button from "@mui/material/Button";

// 이 함수가 반환되면 아래에 Home 함수에 props가 전달된다.
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};


export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className='headingMd'>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className='headingMd padding1px'>
        <h2 className='headingLg'>Blog</h2>
        <ul className='list'>
          {allPostsData.map(({ id, date, title }) => (
            <li className='listItem' key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className='lightText'>
                <Date dateString={date} />
              </small>
              <Button variant="contained">Search</Button>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
