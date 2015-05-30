module.exports = {
  type: 'doc',
  selection: {
    range: {
      start: 0,
      end: 0
    }
  },
  body: [{
    type: 'p',
    runs: [{
      type: 'r',
      text: 'Typography'
    }]
  }, {
    type: 'p',
    runs: [{
      type: 'r',
      text: 'plain text'
    }]
  }, {
    type: 'p',
    runs: [{
      type: 'r',
      text: 'red',
      style: {
        color: 'red'
      }
    }, {
      type: 'r',
      text: ' '
    }, {
      type: 'r',
      text: 'yellow',
      style: {
        backgroundColor: 'yellow'
      }
    }, {
      type: 'r',
      text: ' '
    }, {
      type: 'r',
      text: 'green',
      style: {
        color: 'white',
        backgroundColor: 'green'
      }
    }]
  }]
};
