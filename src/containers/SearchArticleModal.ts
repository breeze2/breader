import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import SearchArticleModal, {
  ISearchArticleModalDispatchProps,
  ISearchArticleModalOwnProps,
  ISearchArticleModalStateProps,
} from '../components/SearchArticleModal'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<
  ISearchArticleModalStateProps,
  ISearchArticleModalOwnProps,
  IReduxState
> = (state: IReduxState) => ({
  articles: state.articles.list,
})

const mapDispatchToProps: MapDispatchToProps<
  ISearchArticleModalDispatchProps,
  ISearchArticleModalOwnProps
> = (dispatch: Dispatch<IReduxAction>) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchArticleModal)
