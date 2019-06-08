import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import VirtualList, { IVirtualListOwnProps, IVirtualListReduxDispatch, IVirtualListReduxState } from '../components/VirtualList'
import { asyncSelectAndReadArticlesAction, IAction } from '../redux/actions'
import { IState } from '../redux/reducers'

const mapStateToProps: MapStateToProps<IVirtualListReduxState, IVirtualListOwnProps, IState> = (state: any) => ({
    articleId: state.articles.selectedId,
    articles: state.articles.list,
})

const mapDispatchToProps: MapDispatchToProps<IVirtualListReduxDispatch, IVirtualListOwnProps> = (dispatch: Dispatch<IAction>) => ({
    selectArticle: (id: number, index: number) => dispatch(asyncSelectAndReadArticlesAction(id, index)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VirtualList)
