import React from "react"
import { Link, graphql } from "gatsby"
import '@deckdeckgo/highlight-code';
import { defineCustomElements as deckDeckGoElement } from '@deckdeckgo/highlight-code/dist/loader';
import { Disqus } from 'gatsby-plugin-disqus'
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  let disqusConfig = {
    url: data.site.siteMetadata.siteUrl + post.fields.slug,
    identifier: post.id,
    title: post.frontmatter.title,
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div className="post_date">{post.frontmatter.date}</div>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody" className="post_body"
        />
        <hr />
      </article>
      <nav className="blog-post-nav">
            {previous && (
              <Link to={previous.fields.slug} className="posts_nav" rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
            {next && (
              <Link to={next.fields.slug} className="posts_nav" rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
      </nav>
      <Disqus config={disqusConfig} />
    </Layout>
  )
}
deckDeckGoElement();

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`