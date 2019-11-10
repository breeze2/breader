import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import ArticleItem, {
  IArticleItemDispatchProps,
  IArticleItemOwnProps,
  IArticleItemStateProps,
} from '../components/ArticleItem'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<
  IArticleItemStateProps,
  IArticleItemOwnProps,
  IReduxState
> = (state: IReduxState) => ({
  feedsMap: state.feeds.map,
})

const mapDispatchToProps: MapDispatchToProps<
  IArticleItemDispatchProps,
  IArticleItemOwnProps
> = (dispatch: Dispatch<IReduxAction>) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleItem)
