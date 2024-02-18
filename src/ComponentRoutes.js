import ArtistRoutes from '../src/routes/ArtistRoutes';
import CollectionRoutes from '../src/routes/CollectionRoutes';
import SketchRoutes from '../src/routes/SketchRoutes';
import VideoRoutes from '../src/routes/VideoRoutes';


const ComponentRoutes = [
  ...ArtistRoutes,
  ...CollectionRoutes,
  ...SketchRoutes,
  ...VideoRoutes,

];

export default ComponentRoutes;
