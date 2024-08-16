import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copy-filepath-and-line-number.run', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const lineNumber = editor.selection.active.line + 1;
			const filePath = editor.document.uri.fsPath;
			const workspaceFolders = vscode.workspace.workspaceFolders;
			const workspaceFolder = workspaceFolders && workspaceFolders.length > 0 ? workspaceFolders[0] : undefined;

			if (workspaceFolder) {
				// Get the relative path
				const relativePath = path.relative(workspaceFolder.uri.fsPath, filePath);
				const formattedPath = `${relativePath}#L${lineNumber}`;

				// Copy to clipboard
				vscode.env.clipboard.writeText(formattedPath).then(() => {
					vscode.window.showInformationMessage('File path and line number copied to clipboard!');
				}, (err) => {
					vscode.window.showErrorMessage('Failed to copy to clipboard: ' + err);
				});
			} else {
				vscode.window.showErrorMessage('No workspace folder is open.');
			}
		} else {
			vscode.window.showErrorMessage('No active editor found.');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
