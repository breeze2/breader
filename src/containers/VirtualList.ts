import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import VirtualList, { IVirtualListOwnProps, IVirtualListReduxDispatch, IVirtualListReduxState } from '../components/VirtualList'
import { asyncSelectAndReadArticlesAction } from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<IVirtualListReduxState, IVirtualListOwnProps, IReduxState> = (state: IReduxState) => ({
    articleId: state.articles.selectedId,
    articles: state.articles.list,
})

const mapDispatchToProps: MapDispatchToProps<IVirtualListReduxDispatch, IVirtualListOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
    selectArticle: (id: number, index: number) => dispatch(asyncSelectAndReadArticlesAction(id, index)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VirtualList)
