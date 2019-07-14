import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'
import { Dispatch } from 'redux'
import VirtualList, { IVirtualListOwnProps, IVirtualListReduxDispatch, IVirtualListReduxState } from '../components/VirtualList'
import { asyncActionDispatcher, asyncSelectAndReadArticleAction } from '../redux/actions'
import { IReduxAction, IReduxState } from '../schemas'

const mapStateToProps: MapStateToProps<IVirtualListReduxState, IVirtualListOwnProps, IReduxState> = (state: IReduxState) => ({
    articles: state.articles.list,
    currentArticle: state.articles.current,
})

const mapDispatchToProps: MapDispatchToProps<IVirtualListReduxDispatch, IVirtualListOwnProps> = (dispatch: Dispatch<IReduxAction>) => ({
    selectArticle: (id: string, index: number) => asyncActionDispatcher(dispatch, asyncSelectAndReadArticleAction(id, index)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VirtualList)
