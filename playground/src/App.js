import React from 'react';
import Paginator from '../..';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data1: [],
      data2: []
    };
  }

  render() {
    return (
      <div>
        <div>
          <strong>Remote Pagination:</strong>
          <ul>
            {
              this.state.data1.map((d, i) => <li key={i}>{d.volumeInfo.title}, {d.volumeInfo.subtitle}</li>)
            }
          </ul>
          <Paginator
            url={'https://www.googleapis.com/books/v1/volumes?q=bitcoin'}
            remote={true}
            queryKeys={{
              currentPage: 'startIndex',
              pageSize: 'maxResults'
            }}
            totalItemsKey={'totalItems'}
            pageSize={25}
            beforeLoad={() => console.log('Loading')}
            afterLoad={(data) => this.setState({ data1: data.items || [] })}
          />
        </div>

        <div style={{ marginTop: '50px' }}>
          <strong>Static Pagination: </strong>
          <ul>
            {
              this.state.data2.map((d, i) => <li key={i}>{d.volumeInfo.title}, {d.volumeInfo.subtitle}</li>)
            }
          </ul>
          <Paginator
            url={'https://www.googleapis.com/books/v1/volumes?q=bitcoin&startIndex=0&maxResults=40'}
            remote={false}
            queryKeys={{
              currentPage: 'startIndex',
              pageSize: 'maxResults'
            }}
            pageSize={2}
            beforeLoad={() => console.log('Loading')}
            afterLoad={(data) => this.setState({ data2: data.items })}
            resKey={'items'}
          />
        </div>

      </div>

    )
  }
}

export default App;