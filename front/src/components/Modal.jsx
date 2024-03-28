import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import warningIcon from '../assets/images/warning.png'
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function SpringModal({ isOpen, setOpen, mode, link, children, handleClose }) {

  console.log(link)
  return (
    <div>
     {/* <Button onClick={() => setOpen(true)}>Open modal</Button> */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style} className="modal">
            <Typography id="spring-modal-title" variant="h6" component="h2" className='modal__title' sx={{fontFamily:'General Sans, sans-serif', fontSize:"3rem"}}>
              <img src={warningIcon} alt="warning" />Attention
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2, fontFamily:'Ranade, sans-serif', fontSize:"1.7rem" }} className='modal__body'>
                {!children ? 'Vous êtes sur le point de quitter un exercice en cours, les tâches faites ne seront pas enregistrées' : children} 
            </Typography>
            <Typography className='modal__actions' sx={{ mt: 2, fontFamily:'Ranade, sans-serif', fontSize:"1.7rem"}}>

              {mode !== 'wariningReload' ? (
                <>
                <p className='modal__action' onClick={()=>setOpen(false)}>Annuler</p>
               
                  <Link to={link}>
                    <p className='modal__action modal__action--backvert' onClick={handleClose}>Continuer</p>
                  </Link>
                  </>
                ) : null}
              
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
