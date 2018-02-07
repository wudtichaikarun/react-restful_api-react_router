import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { numericString } from 'airbnb-prop-types'
import { Auth } from '../lib'
import { 
  withState,
  withHandlers,
  compose 
} from 'recompose'
import Link from 'react-router-dom/Link'

const ArticleContainer = ({

}) => (
  <div>
    <h2>{title}</h2>
    <p>{content}</p>
    <div className='btn-group'>
      <button
        className='btn btn-sm btn-primary'
        onClick={this.backToPreviousUrl}>
          Back
      </button>
      {
        Auth.getToken() && (
          <Link
            to={`/articles/${id}/edit`}
            className='btn btn-sm btn-secondary'>
              Edit
          </Link>
        )
      }
    </div>
  </div>
  )

export default compose(
  withState('article', 'setArticle', { title: '', content: ''}),
  withHandlers({
    loadArticle: ({ match: { params: id }, setArticle }) => _ => {
      fetch(`/articles/${id}`)
        .then(res => res.json())
        .then(({ article }) => setArticle(article))
    },

    backToPreviousUrl: ({ histo : { goBack }}) => _ => {
      goBack()
    }
  })
)(ArticleContainer)

class ArticleContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: numericString().isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  }

  state = {
    title: '',
    content: ''
  }

  componentDidMount() {
    this.loadArticle()
  }

  loadArticle() {
    const { id } = this.props.match.params

    fetch(`/articles/${id}`)
      .then(res => res.json())
      .then(({ article }) => this.setState({ ...article }))
  }

  backToPreviousUrl = () => {
    this.props.history.goBack()
  }

  render() {
    const { id } = this.props.match.params
    const { title, content } = this.state
    
    return( 

    )
  }
}

export default ArticleContainer