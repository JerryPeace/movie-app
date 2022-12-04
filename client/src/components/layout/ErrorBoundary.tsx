import { useState, ErrorInfo, ComponentType, ReactNode } from 'react';
import { Error, ErrorProps, TitleComponent } from 'react-admin';
import { ErrorBoundary as ReactErrBoundary } from 'react-error-boundary';

/**
 * Error boundray implementation based on react-admin. This component is cut from react-admin's
 * Layout component, https://github.com/marmelab/react-admin/blob/384de3c9e3a0b38211b5f9f1ade12cb7a87c12ff/packages/ra-ui-materialui/src/layout/Layout.tsx#L50-L63.
 * @param {Object} props
 * @param {ReactNode} props.children ReactNodes will be rendered if no error found.
 * @param {ComponentType<ErrorProps>} props.error Custom component for rendering the error message.
 *        If absent, we use react-admin <Error /> component to render it.
 * @param {TitleComponent} props.title title component for Error component.
 * @returns
 */
export const ErrorBoundary = (props: ErrorBoundaryProp) => {
  const { children, error: errorComponent, title } = props;

  const [errorInfo, setErrorInfo] = useState<ErrorInfo>();

  const handleError = (error: Error, info: ErrorInfo) => {
    setErrorInfo(info);
  };
  return (
    <ReactErrBoundary
      onError={handleError}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Error
          error={error}
          errorComponent={errorComponent}
          errorInfo={errorInfo}
          resetErrorBoundary={resetErrorBoundary}
          title={title}
        />
      )}
    >
      {children}
    </ReactErrBoundary>
  );
};

export interface ErrorBoundaryProp {
  children?: ReactNode;
  error?: ComponentType<ErrorProps>;
  title?: TitleComponent;
}

export default ErrorBoundary;
