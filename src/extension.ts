import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copy-filepath-and-line-number.run', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const workspaceDir = path.dirname(editor.document.fileName);
			const relativeFilePath = path.relative(workspaceDir, editor.document.fileName).replace(/\\/g, '/');
			const lineNumber = editor.selection.active.line + 1;
			const formattedString = `${relativeFilePath}#L${lineNumber}`;
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
