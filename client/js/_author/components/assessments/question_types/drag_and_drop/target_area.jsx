import React      from 'react';
import _          from 'lodash';
import Menu       from './target_menu';
import Zone       from './target_zone';
import MediaModal from '../../../common/upload_modal/editor_upload_modal';

export default class TargetArea extends React.Component {
  static propTypes = {
    loadingMedia: React.PropTypes.bool,
    visibleZones: React.PropTypes.bool,
    images: React.PropTypes.shape({}).isRequired,
    question: React.PropTypes.shape({
      target: React.PropTypes.shape({}),
      zones: React.PropTypes.shape({}),
      id: React.PropTypes.string,
    }).isRequired,
    uploadMedia: React.PropTypes.func.isRequired,
    setVisible: React.PropTypes.func.isRequired,
    editZone: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      add: null,
      showModal: false,
    };
  }

  replaceImage(media, metadata, newMedia) {
    this.props.uploadMedia(media, 'target', metadata, newMedia);
  }

  selectImage(media, metadata, newMedia) {
    const type = this.state.add;
    if (type === 'snap' || type === 'drop') {
      const img = new Image();
      img.src = URL.createObjectURL(media);
      img.onload = () => {
        // TODO: make sure image isn't bigger than the area
        this.props.editZone('new', {
          type,
          height: img.height,
          width: img.width,
        });
      };
      this.props.uploadMedia(media, 'dropObjects.new', metadata, newMedia);
    } else {
      this.replaceImage(media, metadata, newMedia);
    }
    this.setState({
      showModal: false,
      add: null
    });
  }

  addByRegion() {
    this.props.editZone('new', {
      type: this.state.add,
    });
    this.setState({ add: null });
  }

  render() {
    return (
      <div className="au-c-drag-and-drop__target-area">
        <Menu
          id={this.props.question.id}
          hasTarget={!_.isEmpty(this.props.question.target)}
          openModal={() => this.setState({ showModal: true })}
          addType={this.state.add}
          toggleAdd={type => this.setState({ add: this.state.add !== type ? type : null })}
          addByRegion={() => this.addByRegion()}
          toggleVisible={this.props.setVisible}
          visibleZones={this.props.visibleZones}
        />
        <Zone
          target={this.props.question.target}
          zones={this.props.question.zones}
          editZone={this.props.editZone}
          openModal={() => this.setState({ showModal: true })}
        />
        <MediaModal
          isOpen={this.state.showModal}
          closeModal={() => this.setState({ showModal: false })}
          loading={this.props.loadingMedia}
          media={this.props.images}
          mediaType={'img'}
          insertMedia={(media, metadata, newMedia) => this.selectImage(media, metadata, newMedia)}
          uploadOnly={!!this.state.add}
        />
      </div>
    );
  }
}
