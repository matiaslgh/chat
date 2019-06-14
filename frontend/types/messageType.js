import PropTypes from 'prop-types';

const textType = PropTypes.shape({
  type: PropTypes.oneOf(['text']).isRequired,
  text: PropTypes.string.isRequired,
});

const imageType = PropTypes.shape({
  type: PropTypes.oneOf(['image']).isRequired,
  url: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
});

const videoType = PropTypes.shape({
  type: PropTypes.oneOf(['video']).isRequired,
  url: PropTypes.string.isRequired,
  source: PropTypes.oneOf(['youtube', 'vimeo']),
});

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  recipient: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([textType, imageType, videoType]).isRequired,
});
