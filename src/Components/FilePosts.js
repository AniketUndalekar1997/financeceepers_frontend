import axios from "axios";
import React from "react";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component"

class FilePosts extends React.Component {
    state = {
        posts: [],
        next_url: `http://127.0.0.1:8000/api/posts?page=${1}`,
        count: null,
        more_exist: true,
    };

    componentDidMount() {
        axios.get(this.state.next_url).then(res => {
            var has_more = false;
            if (res.data.next) {
                has_more = true;
            }
            this.setState({
                next_url: res.data.next,
                count: res.data.count,
                posts: [...this.state.posts, ...res.data.results],
                more_exist: has_more
            })
        })
    }


    fetchMoreData = () => {
        // an async api call which send 20 more records in 1.5 secs

        // axios.get(this.state.next_url).then(res => {
        //     var has_more = false;
        //     if (res.data.next) {
        //         has_more = true;
        //     }
        //     this.setState({
        //         next_url: res.data.next,
        //         count: res.data.count,
        //         posts: this.state.posts.concat(res.data.results),
        //         more_exist: has_more
        //     })
        // })

        setTimeout(() => {
            axios.get(this.state.next_url).then(
                res => {
                    var has_more = false;
                    if (res.data.next) {
                        has_more = true;
                    }
                    this.setState({
                        next_url: res.data.next,
                        posts: [...this.state.posts, ...res.data.results],
                        more_exist: has_more
                    })
                }).catch((err) => {
                    window.alert(err);
                })
        }, 1500);
        console.log("fetching ", this.state.next_url);
    };


    render() {
        return (
            <InfiniteScroll
                dataLength={this.state.count}
                pageStart={0}
                next={this.fetchMoreData}
                hasMore={this.state.more_exist}
                loader={<Loader />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                // below props for pull down functionality

                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }

            >
                <div className="ui cards" style={{ marginTop: 20 }}>
                    {this.state.posts.map((post) => (
                        <div className="card">
                            <div className="content">
                                <div className="header">{post.title}</div>
                                <div className="description">
                                    <p>{post.body}</p>
                                </div>
                            </div>
                            <div className="extra content">
                                <div className="right floated author">
                                    User_id:{post.userId}
                                </div>
                            </div>
                        </div>

                    ))
                    }
                </div>
            </InfiniteScroll >

        );
    }
}

export default FilePosts;