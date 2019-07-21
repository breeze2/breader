import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import ArticleItem, { IArticleItemOwnProps, IArticleItemReduxDispatch, IArticleItemReduxState } from '../components/ArticleItem'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<IArticleItemReduxState, IArticleItemOwnProps, IReduxState> = (state: IReduxState) => ({
    feedsMap: state.feeds.map,
})

const mapDispatchToProps: MapDispatchToProps<IArticleItemReduxDispatch, IArticleItemOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArticleItem)
