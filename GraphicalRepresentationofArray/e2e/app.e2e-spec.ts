import { GraphicalRepresentationofArrayPage } from './app.po';

describe('graphical-representationof-array App', function() {
  let page: GraphicalRepresentationofArrayPage;

  beforeEach(() => {
    page = new GraphicalRepresentationofArrayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
