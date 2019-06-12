function attachDispatchToActions(actions, dispatch) {
  const actionsWithDispatch = {};
  Object.keys(actions).forEach(key => {
    actionsWithDispatch[key] = (...params) => dispatch(actions[key](...params));
  });

  return actionsWithDispatch;
}

export default attachDispatchToActions;
