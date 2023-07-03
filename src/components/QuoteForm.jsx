
import { useAccordionButton } from 'react-bootstrap/AccordionButton';


export default function ContextAwareToggle({ children, eventKey, callback}) {
  const decoratedOnClick = useAccordionButton(eventKey);

return (
  <button
    type="button"
    style={{ backgroundColor: 'pink' }}
    onClick={decoratedOnClick}
  >
    {children}
  </button>
);
};