module.exports = {
  type: 'doc',
  selection: {
    range: {
      start: 12,
      end: 12
    }
  },
  body: [{
    type: 'p',
    runs: [{
      type: 'r',
      text: 'hello world',
      style: {
        backgroundColor: 'yellow'
      }
    }, {
      type: 'r',
      text: ' '
    }, {
      type: 'r',
      text: 'summernote',
      style: {
        color: 'white',
        backgroundColor: 'red'
      }
    }, {
      type: 'r',
      text: '!!!'
    }]
  }, {
    type: 'p',
    runs: [{
      type: 'r',
      text: 'winternote is ...',
      style: {
        color: 'white',
        backgroundColor: 'green'
      }
    }]
  }]
};
