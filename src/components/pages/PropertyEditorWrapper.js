import { useParams } from 'react-router-dom';
import PropertyEditor from './PropertyEditor';

const PropertyEditorWrapper = () => {
  const { propertyId } = useParams(); // Obtener el ID de la propiedad desde la URL
  return <PropertyEditor propertyId={propertyId} />;
};

export default PropertyEditorWrapper;