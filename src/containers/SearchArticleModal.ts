import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import SearchArticleModal, {
  ISearchArticleModalOwnProps,
  ISearchArticleModalReduxDispatch,
  ISearchArticleModalReduxState,
} from '../components/SearchArticleModal'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<
  ISearchArticleModalReduxState,
  ISearchArticleModalOwnProps,
  IReduxState
> = (state: IReduxState) => ({
  articles: state.articles.list,
})

const mapDispatchToProps: MapDispatchToProps<
  ISearchArticleModalReduxDispatch,
  ISearchArticleModalOwnProps
> = (dispatch: Dispatch<IReduxAction>) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchArticleModal)
