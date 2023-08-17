import React from 'react';

import { mountRemoteComponent } from '@/utils/loadComponent';
import { useNavigate } from 'react-router-dom';

const NewPosts = () => {
  const navigate = useNavigate();
  const newPostsProps = {
    navigate
  };

  return (
    <section className="from-blog spad">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title from-blog__title">
            <h2>From The Blog</h2>
          </div>
        </div>
      </div>
      {mountRemoteComponent({ module: 'blog', component: 'PostList', props: newPostsProps })}
    </section>
  );
};

export default NewPosts;
