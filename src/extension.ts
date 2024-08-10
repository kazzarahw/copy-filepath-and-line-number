import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.copyFilePathAndLineNumber', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const filePath = document.uri.fsPath;
			const lineNumber = editor.selection.active.line + 1;

			// Get the workspace folder
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
			let relativeFilePath = filePath;

			if (workspaceFolder) {
				// Convert to relative path
				relativeFilePath = path.relative(workspaceFolder.uri.fsPath, filePath);
			}

			const formattedString = `${relativeFilePath}#L${lineNumber}`;
			vscode.env.clipboard.writeText(formattedString).then(() => {
				vscode.window.showInformationMessage('Copied to clipboard: ' + formattedString);
			});
		} else {
			vscode.window.showInformationMessage('No active editor found');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
