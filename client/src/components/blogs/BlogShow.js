import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBlog } from '../../actions'

class BlogShow extends Component {
  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id)
  }

  renderImage() {
    if (this.props.blog.imageUrl) {
      return (
        <img
          alt=""
          src={`https://my-aws-dev-bucket-2025.s3.us-east-2.amazonaws.com/${this.props.blog.imageUrl}`}
        />
      )
    }
  }

  render() {
    if (!this.props.blog) {
      return ''
    }

    const { title, content } = this.props.blog

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        {this.renderImage()}
      </div>
    )
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] }
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow)
