import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copy-filepath-and-line-number.run', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const filePath = vscode.workspace.asRelativePath(editor.document.fileName);
			const lineNumber = editor.selection.active.line + 1;
			const formattedString = `${filePath}#L${lineNumber}`;
			vscode.env.clipboard.writeText(formattedString).then(() => {
				vscode.window.showInformationMessage('Copied to clipboard: ' + formattedString);
			});
		} else {
			vscode.window.showErrorMessage('No active text editor');
		}
	});
	context.subscriptions.push(disposable);
}

export function deactivate() { }
