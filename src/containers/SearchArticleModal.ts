import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import SearchArticleModal, { ISearchArticleModalOwnProps, ISearchArticleModalReduxDispatch, ISearchArticleModalReduxState } from '../components/SearchArticleModal'
import { IAction } from '../redux/actions'
import { IState } from '../redux/reducers'

const mapStateToProps: MapStateToProps<ISearchArticleModalReduxState, ISearchArticleModalOwnProps, IState> = (state: IState) => ({
    articles: state.articles.list,
})

const mapDispatchToProps: MapDispatchToProps<ISearchArticleModalReduxDispatch, ISearchArticleModalOwnProps> = (dispatch: Dispatch<IAction>) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchArticleModal)
