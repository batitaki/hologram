import CollectionRoutes from '../src/routes/CollectionRoutes';
import SketchRoutes from '../src/routes/SketchRoutes';
import VideoRoutes from '../src/routes/VideoRoutes';


const ComponentRoutes = [
  ...CollectionRoutes,
  ...SketchRoutes,
  ...VideoRoutes,

];

export default ComponentRoutes;
