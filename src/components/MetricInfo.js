import React from 'react';
import '../styles/modal_info.scss';
import PropTypes from 'prop-types';


const MetricInfo = ({ currData }) => {
  return (
    <div className="modal-container">
      <div className="title">
        {currData.title}
      </div>
      <div className="metric-row">
        <div>
          <p className="topic">Category</p>
          <p className="value">{currData.category || '---'}</p>
        </div>
        <div>
          <p className="topic">Metric name</p>
          <p className="value">{currData.metric_name || '---'}</p>
        </div>
      </div>
      <div className="metric-row">
        <div>
          <p className="topic">Start</p>
          <p className="value">{currData.metric_start || '---'}</p>
        </div>
        <div>
          <p className="topic">Target</p>
          <p className="value">{currData.metric_target || '---'}</p>
        </div>
      </div>
    </div>
  )
}

MetricInfo.propTypes = {
  currData: PropTypes.object.isRequired,
};

export default MetricInfo;