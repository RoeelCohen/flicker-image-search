import React, { Component, Fragment } from 'react';

const CAMERA_CLASS = 'cameraVisibile';

/*eslint no-use-before-define: 0*/
export default class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraVisibile: false,
      err: ''
    };
  }

  componentDidMount() {
    const QRScanner = QRScanner || null;

    !QRScanner && this.setState({err: 'Failed to load QRScanner..'});

    QRScanner &&
      QRScanner.prepare((err, status) => {
        err && this.setState({ cameraVisibile: false, err });

        if (status && status.authorized) {
          //document.body.style.background = "none";
          QRScanner.scan((err, text) => {
            debugger;
            err && alert(err);
            text && alert(text);
          });
          QRScanner.show();
          document.body.classList.add(CAMERA_CLASS);
        } else if (status.denied) {
          this.setState({err: 'Might as well delete the app....'});
          // The video preview will remain black, and scanning is disabled. We can
          // try to ask the user to change their mind, but we'll have to send them
          // to their device settings with `QRScanner.openSettings()`.
        } else {
          this.setState({err: 'Give us permission to the camera if you want a QR scanner..'});
          // we didn't get permission, but we didn't get permanently denied. (On
          // Android, a denial isn't permanent unless the user checks the "Don't
          // ask again" box.) We can ask again at the next relevant opportunity.
        }
      });
  }

  componentWillUnmount() {
    document.body.classList.remove(CAMERA_CLASS);
  }

  render() {

    const {cameraVisibile} = this.state;

    return (
      <Fragment>
        {cameraVisibile ? 
        <div>We got cammera</div> :
        <div>Camera is not available: {this.state.err}</div>}
      </Fragment>
    );
  }
}
