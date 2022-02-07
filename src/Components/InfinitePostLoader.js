import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './Loader';

function InfinitePostLoader() {

    const [items, setItems] = useState([]);
    const [noMore, setNoMore] = useState(true)
    const [page, setPage] = useState(2);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const getComments = async () => {
            const res = await fetch(`http://127.0.0.1:8000/api/posts?page=1`);
            const data = await res.json();
            setItems(data.results)
            setCount(data.count);
        }
        getComments()
    }, []);

    const fetchPosts = async () => {
        const res = await fetch(`http://127.0.0.1:8000/api/posts?page=${page}`);
        const data = await res.json();
        return data;
    }

    const fetchMoreData = async () => {
        const nextPosts = await fetchPosts();
        setTimeout(() => {
            setItems([...items, ...nextPosts.results])
            if (nextPosts.results.length === 0 || nextPosts.results.length < 12) {
                setNoMore(false);
            }
            setPage(page + 1);
        }, 1500)

    }

    return (

        <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={noMore}
            loader={<Loader />}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all {count} posts</b>
                </p>
            }
        >
            <div className="ui cards" style={{ marginTop: 20 }}>
                {items.map((post) => (
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

    )
}

export default InfinitePostLoader;
