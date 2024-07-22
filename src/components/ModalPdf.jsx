import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import { PDFViewer } from '@react-pdf/renderer';
import ProgressionPdf from './ProgressionPdf'; // Assurez-vous que ce chemin est correct
import closeIcon from '../assets/images/closeIconBlack.svg';

// Composant pour l'effet de fade
const Fade = React.forwardRef(function Fade(props, ref) {
  const { children, in: open, ...other } = props;
  const style = useSpring({
    opacity: open ? 1 : 0,
    config: { duration: 300 },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children)}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool.isRequired,
};

// Style de la boîte modale
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

const ModalPdf = ({ isOpen, onRequestClose, user, exercises }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // Arrière-plan sombre
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          {/* <button onClick={onRequestClose} style={{ marginBottom: '10px' }}>Fermer</button> */}
          <img src={closeIcon} alt="Fermer le fichier pdf de la progression" className="close" onClick={onRequestClose}   />

          <PDFViewer width="100%" height="90%">
            <ProgressionPdf user={user} exercises={exercises} />
          </PDFViewer>
        </Box>
      </Fade>
    </Modal>
  );
};

ModalPdf.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  exercises: PropTypes.array.isRequired,
};

export default ModalPdf;
