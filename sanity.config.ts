import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemas } from './sanity/schemas';

export default defineConfig({
  name: 'single-stair-nc',
  title: 'Single Stair NC',

  projectId: 'n8639pbu',
  dataset: 'production',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Configuration
            S.listItem()
              .title('Site Configuration')
              .child(
                S.list()
                  .title('Site Configuration')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                      ),
                    S.listItem()
                      .title('Site Config')
                      .child(
                        S.document()
                          .schemaType('siteConfig')
                          .documentId('siteConfig')
                      ),
                  ])
              ),
            
            // Pages
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('General Pages')
                      .child(S.documentTypeList('page').title('General Pages')),
                    S.listItem()
                      .title('Act Page')
                      .child(
                        S.document()
                          .schemaType('actPage')
                          .documentId('actPage')
                      ),
                    S.listItem()
                      .title('About Page')
                      .child(
                        S.document()
                          .schemaType('aboutPage')
                          .documentId('aboutPage')
                      ),
                    S.listItem()
                      .title('Contact Page')
                      .child(
                        S.document()
                          .schemaType('contactPage')
                          .documentId('contactPage')
                      ),
                  ])
              ),
            
            // Scrollytelling Content
            S.listItem()
              .title('Scrollytelling Sections')
              .child(
                S.documentTypeList('scrollytellingSection')
                  .title('Scrollytelling Sections')
              ),
            
            // Educational Content
            S.listItem()
              .title('Educational Content')
              .child(
                S.list()
                  .title('Educational Content')
                  .items([
                    S.listItem()
                      .title('Articles')
                      .child(S.documentTypeList('article').title('Articles')),
                    S.listItem()
                      .title('FAQ Items')
                      .child(S.documentTypeList('faqItem').title('FAQ Items')),
                    S.listItem()
                      .title('Legislation Checklist')
                      .child(S.documentTypeList('legislationChecklist').title('Legislation Checklist')),
                  ])
              ),
            
            // Gallery
            S.listItem()
              .title('Building Examples')
              .child(
                S.documentTypeList('buildingExample')
                  .title('Building Examples')
              ),
            
            // Policy Tracking
            S.listItem()
              .title('Policy Tracking')
              .child(
                S.list()
                  .title('Policy Tracking')
                  .items([
                    S.listItem()
                      .title('Policy Tracker')
                      .child(S.documentTypeList('policyTracker').title('Policy Tracker')),
                    S.listItem()
                      .title('Legislators')
                      .child(S.documentTypeList('legislator').title('Legislators')),
                    S.listItem()
                      .title('Districts')
                      .child(S.documentTypeList('district').title('Districts')),
                  ])
              ),
            
            // Action Tools
            S.listItem()
              .title('Action Tools')
              .child(
                S.list()
                  .title('Action Tools')
                  .items([
                    S.listItem()
                      .title('Letter Templates')
                      .child(S.documentTypeList('letterTemplate').title('Letter Templates')),
                    S.listItem()
                      .title('Call to Actions')
                      .child(S.documentTypeList('callToAction').title('Call to Actions')),
                  ])
              ),
            
            // External Content
            S.listItem()
              .title('Substack Posts')
              .child(
                S.documentTypeList('substackPost')
                  .title('Substack Posts')
              ),
          ])
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemas,
  },
});


