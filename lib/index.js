import React from 'react';
import './style.scss';
import { fetchData, getPageNosToDisplay } from './helper';

export default class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      totalItems: null,
      count: null,
      pageNos: [],
      pageNosDisplay: [],
      pageSelected: 0
    };

    this.pageItr = props.remote ? this.remotePaginator(props.url, props.queryKeys, props.pageSize) : this.staticPaginator(props.url, props.pageSize);
  }

  componentDidMount() {
    this.paginate();
  }

  async *staticPaginator(url, pageSize) {
    let currentPage = this.state.pageSelected;
    let data = await fetchData(url);
    const isArray = Array.isArray(data);
    const items = isArray ? data : data[this.props.resKey];
    const count = Math.round(items.length / pageSize);

    if (!isArray) {
      data = {
        ...data,
        [this.props.resKey]: items
      };
    }

    this.setState({
      data,
      totalItems: items.length,
      count,
      pageNos: Array(count).fill('').map((a, i) => i + 1)
    });

    while (true) {
      const pageStart = currentPage === 0 ? currentPage : currentPage * pageSize;
      const pageEnd = pageSize + pageStart;
      const pageData = isArray ? items.slice(pageStart, pageEnd) : { ...data, [this.props.resKey]: items.slice(pageStart, pageEnd) }

      currentPage = yield pageData;
    }
  }

  async *remotePaginator(url, keys, pageSize) {
    let currentPage = this.state.pageSelected;
    const delimeter = url.includes('?') ? '&' : '?';

    while (true) {
      const pageStart = currentPage === 0 ? currentPage : currentPage * pageSize + 1;
      const fetchUrl = `${url}${delimeter}${keys.currentPage}=${pageStart}&${keys.pageSize}=${pageSize}`;
      const data = await fetchData(fetchUrl);
      const count = Math.round(data[this.props.totalItemsKey] / pageSize);

      this.setState({
        data,
        totalItems: data[this.props.totalItemsKey],
        count,
        pageNos: Array(count).fill('').map((a, i) => i + 1)
      });

      currentPage = yield data;
    }
  }

  async paginate(pageSelected = 1) {
    this.props.beforeLoad();

    switch (pageSelected) {
      case 'next':
        pageSelected = this.state.pageSelected + 1;
        break;
      case 'prev':
        pageSelected = this.state.pageSelected - 1;
        break;
    }

    const data = await this.pageItr.next(pageSelected - 1);
    const { pageNos, count } = this.state;

    this.setState({
      pageSelected,
      pageNosDisplay: getPageNosToDisplay(pageNos, count, pageSelected)
    }, () => this.props.afterLoad(data.value))
  }

  render() {
    const { pageNosDisplay, pageSelected, count } = this.state;

    return (
      <ul className="container">
        <li className={pageSelected === 1 ? 'disabled' : ''}><span onClick={() => this.paginate('prev')}>{'<'}</span></li>
        {
          pageNosDisplay.map((a, index) => {
            return (
              <li key={index} className={pageSelected === a ? 'selected' : ''} disabled={true}>
                {
                  !isNaN(a) ? <span onClick={() => this.paginate(a)}>{a}</span> : <span className="dot">{a}</span>
                }
              </li>
            );
          })
        }
        <li className={pageSelected === count ? 'disabled' : ''}><span onClick={() => this.paginate('next')}>{'>'}</span></li>
      </ul >
    );
  }
}