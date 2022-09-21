import { graphql } from "gatsby"
// import { HeroProps } from "./hero"
// import { FeatureListProps } from "./feature-list"
// import { BenefitListProps } from "./benefit-list"
// import { TestimonialListProps } from "./testimonial-list"
// import { CtaProps } from "./cta"
// import { ProductListProps } from "./product-list"

// import { AboutHeroProps } from "./about-hero"
// import { AboutStatListProps } from "./about-stat-list"
// import { AboutLeadershipProps } from "./about-leadership"
// import { AboutLogoListProps } from "./about-logo-list"

export { default as HeroBanner } from "./hero"
export { default as FeatureList } from "./feature-list"
export { default as LogoList } from "./logo-list"
export { default as BenefitList } from "./benefit-list"
export { default as TestimonialList } from "./testimonial-list"
export { default as StatList } from "./stat-list"
export { default as Cta } from "./cta"
export { default as ProductList } from "./product-list"
export { default as AboutHero } from "./about-hero"
export { default as AboutStatList } from "./about-stat-list"
export { default as AboutLeadership } from "./about-leadership"
export { default as AboutLogoList } from "./about-logo-list"

export type SectionProps =
  | Queries.HeroBannerContentFragment
  | Queries.FeatureListContentFragment
  | Queries.LogoListContentFragment
  | Queries.BenefitListContentFragment
  | Queries.TestimonialListContentFragment
  | Queries.StatListContentFragment
  | Queries.CtaContentFragment
  | Queries.ProductListContentFragment

type SectionTypes =
  | "HeroBanner"
  | "FeatureList"
  | "LogoList"
  | "BenefitList"
  | "TestimonialList"
  | "StatList"
  | "Cta"
  | "ProductList"
  | "AboutHero"
  | "AboutStatList"
  | "AboutLeadership"
  | "AboutLogoList"

type WithSectionType<S = SectionTypes, P = SectionProps> = {
  id: string
  sectionType: S
} & P

export type HomepageBlock =
  | WithSectionType<"HeroBanner", Queries.HeroBannerContentFragment>
  | WithSectionType<"FeatureList", Queries.FeatureContentFragment>
  | WithSectionType<"LogoList", Queries.LogoListContentFragment>
  | WithSectionType<"BenefitList", Queries.BenefitListContentFragment>
  | WithSectionType<"TestimonialList", Queries.TestimonialListContentFragment>
  | WithSectionType<"StatList", Queries.StatListContentFragment>
  | WithSectionType<"Cta", Queries.CtaContentFragment>
  | WithSectionType<"ProductList", Queries.ProductListContentFragment>

export const query = graphql`
  fragment SectionsContent on ContentfulPageTypeLandingPage {
    id
    pageComponents {
      ...HeroBannerContent
      ...FeatureListContent
      ...CtaContent
      ...LogoListContent
      ...TestimonialListContent
      ...BenefitListContent
      ...StatListContent
      ...ProductListContent
    }
  }
`
