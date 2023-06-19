import React, { Children } from 'react';


const Menu = ({ children }) => children;

const Content = ({ children }) => children;

const MainPageLayout = ({ children }) => {
  const renderMenu = () => {
    const menuChild = Children.toArray(children).find((child) => {
      return child.type == Menu;
    });
    return menuChild.props.children;
  };

  const renderContent = () => {
    const contentChild = Children.toArray(children).find((child) => {
      return child.type == Content;
    });
    return contentChild.props.children;
  };

  return (
    <div className="columns">
      <div className="column is-2">
        {renderMenu()}
      </div>
      <div className="container column is-10">
        {renderContent()}
      </div>
    </div>
  );
};

MainPageLayout.Menu = Menu;
MainPageLayout.Content = Content;

export default MainPageLayout;
