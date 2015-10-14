import React, { PropTypes } from 'react';
import classnames from 'classnames';

import TabView from '@economist/component-tabview';

import ArticleBody from './body';

import variantify from './variantify';
const variantTypes = [
  'world-if',
  'world-in',
];

const getSrcSet = (image) => Object.keys(image).map((key) => `${image[key]} ${key}`).join(',');

const WinSubheader = (props) => {
  return <header
    className={classnames(
      props.getVariantClassNames(`${props.defaultClassName}--subheader`),
      'margin-l-1',
      'gutter-l',
      'col-10'
    )}
  >
    <h2
      className={classnames(
        props.getVariantClassNames(`${props.defaultClassName}--byline`),
        'margin-l-1',
        'gutter-l',
        'col-10'
      )}
      itemProp="byline"
    >
      By-line to follow
    </h2>

    <h2
      className={classnames(
        props.getVariantClassNames(`${props.defaultClassName}--pubdate`),
        'margin-l-1',
        'gutter-l',
        'col-10'
      )}
      itemProp="publishdate"
    >
      Publish date to follow
    </h2>

    <h2
      className={classnames(
        props.getVariantClassNames(`${props.defaultClassName}--section-section`),
        'margin-l-1',
        'gutter-l',
        'col-10'
      )}
      itemProp="section"
    >
      {props.section}
    </h2>
  </header>
};

const WinHeader = (props) => {
  let section = null;
  let flytitle = null;
  let title = null;
  let rubric = null;
  if (props.flytitle) {
    flytitle = (
      <h1
        className={classnames(
          props.getVariantClassNames(`${props.defaultClassName}--flytitle`),
          'gutter-l',
          'col-10'
        )}
        itemProp="headline"
      >
        {props.flytitle}
      </h1>
    );
  }
  if (props.title) {
    title = (
      <h3
        className={classnames(
          props.getVariantClassNames(`${props.defaultClassName}--title`),
          'gutter-l',
          'col-10'
        )}
        itemProp="alternativeHeadline"
      >
        {props.title}
      </h3>
    );
  }
  if (props.rubric) {
    rubric = (
      <h3
        className={classnames(
          props.getVariantClassNames(`${props.defaultClassName}--rubric`),
          'gutter-l',
          'col-10'
        )}
        itemProp="rubric"
      >
        {props.rubric}
      </h3>
    );
  }
  if (flytitle || title || rubric) {
    return (
      <header
        className={classnames(
          props.getVariantClassNames(`${props.defaultClassName}--header`)
        )}
      >
        {flytitle}
        {title}
        {rubric}
      </header>
    );
  }
};

const WifHeader = (props) => {
  let section = null;
  let flytitle = null;
  let title = null;
  if (props.flytitle) {
    flytitle = (
      <h1
        className={classnames(
          props.getVariantClassNames(`${props.defaultClassName}--flytitle`),
          'margin-l-1',
          'gutter-l',
          'col-10'
        )}
        itemProp="headline"
      >
        {props.flytitle}
      </h1>
    );
  }
  if (props.title) {
    title = (
      <h3
        className={classnames(
          props.getVariantClassNames(`${props.defaultClassName}--title`),
          'margin-l-1',
          'gutter-l',
          'col-10'
        )}
        itemProp="alternativeHeadline"
      >
        {props.title}
      </h3>
    );
  }
  if (flytitle || title) {
    if (props.section) {
      section = (
        <h2
          className={classnames(
            props.getVariantClassNames(`${props.defaultClassName}--header-section`),
            'margin-l-1',
            'gutter-l'
          )}
          itemProp="articleSection"
        >
          {props.section}
        </h2>
      );
    }
    return (
      <header
        className={classnames(
          props.getVariantClassNames(`${props.defaultClassName}--header`)
        )}
      >
        {section}
        {flytitle}
        {title}
      </header>
    );
  }
};

const WifTabView = (props) => {
  const notCurrentArticle = (article) => {
    const currentArticleId = props.id;
    return currentArticleId !== article.id;
  };

  const sections = props.sections;
  const TabViewDefaultClassName = TabView.defaultClassName || 'TabView';
  return (
    <TabView
      variantType={props.variantType}
    >
      {Object.keys(sections).map((title, key) => (
        <div title={title} key={key} itemScope itemType="http://schema.org/itemList">
          <div
            className={classnames(
              props.getVariantClassNames(`${TabViewDefaultClassName}--Views--Tint`)
            )}
          ></div>
          {sections[title].filter(notCurrentArticle).map((article) => (
            <a href={`/article/${article.id}/${article.attributes.slug}`} itemProp="url">
              <figure
                className={classnames(
                  props.getVariantClassNames(`${TabViewDefaultClassName}--View--Content`)
                )}
              >
                <img
                  src={`${article.attributes.tileimage['1.0x']}`}
                  srcSet={getSrcSet(article.attributes.tileimage)}
                  alt={article.attributes.imagealt}
                  itemProp="image"
                />
                <figcaption itemProp="caption">{article.attributes.toc}</figcaption>
              </figure>
            </a>
          ))}
        </div>
      ))}
    </TabView>
  );
}

@variantify('ArticleTemplate', variantTypes, 'world-if')
class ArticleTemplate extends React.Component {

  static get propTypes() {
    return {
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      flytitle: PropTypes.string.isRequired,
      rubric: PropTypes.string.isRequired,
      section: PropTypes.string.isRequired,
      mainImage: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }).isRequired,
      content: PropTypes.array.isRequired,
      sections: PropTypes.object.isRequired,
    };
  }

  renderHeader = () => {
    if (this.props.variantType === 'world-if') {
      return <WifHeader {...this.props} />;
    } else {
      return <WinHeader {...this.props} />;
    }
  }

  render() {
    const title = this.props.title || this.props.slug;

    let image = null;
    if (this.props.mainImage) {
      image = (
        <img
          className={classnames(
            this.props.getVariantClassNames(`${this.props.defaultClassName}--image`)
          )}
          src={`${this.props.mainImage.src['1.0x']}`}
          srcSet={getSrcSet(this.props.mainImage.src)}
          alt={this.props.mainImage.alt}
          itemProp="image"
        />
      );
    }
    return (
      <article
        className={classnames(
          this.props.getVariantClassNames(`${this.props.defaultClassName}--container`)
        )}
        data-section={this.props.section}
        itemScope
        itemType="http://schema.org/NewsArticle"
      >
        <div
          className={classnames(
            this.props.getVariantClassNames(`${this.props.defaultClassName}--imagecontainer`)
          )}
        >
          <div
            className={classnames(
              this.props.getVariantClassNames(`${this.props.defaultClassName}--imagecontainer-inner`)
            )}
          >
            {image}
            {this.renderHeader()}
          </div>
        </div>
        <WinSubheader {...this.props} />

        {this.props.variantType === 'world-if' ?

          <p
            className={classnames(
              this.props.getVariantClassNames(`${this.props.defaultClassName}--rubric`),
              'margin-l-1',
              'gutter-l',
              'col-10'
            )}
            itemProp="description"
          >
            {this.props.rubric}
          </p>

        : ''}

        <ArticleBody
          variantType={this.props.variantType}
          content={this.props.content}
        />

        {this.props.variantType === 'world-in' ?
          <div
            className={classnames(
              this.props.getVariantClassNames(`${this.props.defaultClassName}--byline-footer`),
              'margin-l-1',
              'gutter-l',
              'col-10'
            )}
          >
            <h3
              className={classnames(
                this.props.getVariantClassNames(`${this.props.defaultClassName}--byline`),
                'margin-l-1',
                'gutter-l',
                'col-10'
              )}
              itemProp="byline"
            >
              Zanny Minton Beddoes
            </h3>
            <span
              className={classnames(
                this.props.getVariantClassNames(`${this.props.defaultClassName}--byline-details`),
                'gutter-l',
                'col-10'
              )}
              itemProp="bylinedetails"
            >
            business affairs editor, The Economist
            </span>
          </div>
        : ''}
        <WifTabView {...this.props} />
      </article>
    );
  }
}

export default ArticleTemplate;
